import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Location from '..';
import * as REACTMAPS from '@react-google-maps/api';
import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
jest.mock('@react-google-maps/api', () => ({
  Marker: () => <div data-testid="map-marker"></div>,
  GoogleMap: ({ children }) => <div data-testid="map">{children}</div>,
  useLoadScript: () => ({
    isLoaded: true,
    loadError: null,
  }),
}));

describe('Location', () => {
  beforeEach(() => {
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 37.7749,
              longitude: -122.4194,
            },
          })
        )
      ),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('renders a Google Map', async () => {
    render(<Location />);
    await screen.findByTestId('map');

    expect(screen.getByTestId('map-marker')).toBeTruthy();
  });

  it('displays an error message when geocoding fails', async () => {
    global.window.google = {
      maps: {
        Geocoder: jest.fn().mockImplementation(() => ({
          geocode: jest
            .fn()
            .mockImplementation((_, callback) =>
              callback(null, 'ZERO_RESULTS')
            ),
        })),
      },
    };

    render(<Location />);

    await screen.findByText('ZERO_RESULTS', { selector: 'div' });
  });

  it('fills in the address fields when the marker is moved', async () => {
    global.window.google = {
      maps: {
        Geocoder: jest.fn(() => ({
          geocode: (options, callback) =>
            callback(
              [
                {
                  formatted_address: '123 Main St, Springfield, CA, USA',
                  address_components: [
                    { types: ['locality'], long_name: 'Springfield' },
                    {
                      types: ['administrative_area_level_1'],
                      long_name: 'CA',
                    },
                    { types: ['country'], long_name: 'USA' },
                  ],
                },
              ],
              'OK'
            ),
        })),
      },
    };
    render(<Location />);

    await screen.findByTestId('map');

    fireEvent.dragEnd(screen.getByTestId('map-marker'), {
      latLng: { lat: () => 40, lng: () => -74 },
    });

    await waitFor(
      () =>
        expect(screen.getByPlaceholderText('Address')).toHaveValue(
          '123 Main St, Springfield, CA, USA'
        ),
      expect(screen.getByPlaceholderText('City')).toHaveValue('Springfield'),
      expect(screen.getByPlaceholderText('State')).toHaveValue('CA'),
      expect(screen.getByPlaceholderText('Country')).toHaveValue('USA')
    );
  });

  it('fails the get address when the marker is moved', async () => {
    global.window.google = {
      maps: {
        Geocoder: jest.fn(() => ({
          geocode: (options, callback) => callback([], 'OK'),
        })),
      },
    };
    render(<Location />);

    await screen.findByText('No results found', { selector: 'div' });
  });

  it('fails the get address when the api response is invalid', async () => {
    global.window.google = {
      maps: {
        Geocoder: jest.fn(() => ({
          geocode: (options, callback) =>
            callback(
              [
                {
                  formatted_address: '',
                  address_components: [
                    { types: ['invalid'], long_name: 'invalid' },
                  ],
                },
              ],
              'OK'
            ),
        })),
      },
    };
    render(<Location />);

    await waitFor(
      () => expect(screen.getByPlaceholderText('Address')).toHaveValue(''),
      expect(screen.getByPlaceholderText('City')).toHaveValue(''),
      expect(screen.getByPlaceholderText('State')).toHaveValue(''),
      expect(screen.getByPlaceholderText('Country')).toHaveValue('')
    );
  });
});
