import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Form, Button, Spin, Alert } from 'antd';
const { Item } = Form;
const LIBRARIES = ['places'];
const center = {
  lat: 37.7749,
  lng: -122.4194,
};
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const StyledItem = styled(Item)`
  width: 80%;
`;

const StyledInput = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  width: 100%;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const StyledSpin = styled(Spin)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const StyledAlert = styled(Alert)`
  margin: 16px 0;
`;
const Location = () => {
  const [form] = Form.useForm();
  const [position, setPosition] = useState(center);
  const [loadError, setLoadError] = useState(null);
  const [geocodeError, setGeocodeError] = useState(null);
  const libraries = useMemo(() => LIBRARIES, []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries,
  });

  const loadMap = () => {
    if (window.google && window.google.maps.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            form.setFieldsValue({
              address: results[0].formatted_address,
            });
            const addressComponents = results[0].address_components;
            const city = addressComponents.find(
              (component) => component.types[0] === 'locality'
            );
            if (city) {
              form.setFieldsValue({
                city: city.long_name,
              });
            }
            const state = addressComponents.find(
              (component) =>
                component.types[0] === 'administrative_area_level_1'
            );
            if (state) {
              form.setFieldsValue({
                state: state.long_name,
              });
            }
            const country = addressComponents.find(
              (component) => component.types[0] === 'country'
            );
            if (country) {
              form.setFieldsValue({
                country: country.long_name,
              });
            }
          } else {
            setGeocodeError('No results found');
          }
        } else {
          setGeocodeError(status);
        }
      });
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setPosition(currentPosition);
      },
      (error) => {
        console.log(error, 'hii');
      }
    );
    // if (scriptLoadError) {
    //   setLoadError('Error loading maps');
    //   return;
    // }
    loadMap();
  }, []);
  const handleMarkerDragEnd = (e) => {
    const { latLng } = e;
    setPosition({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
    loadMap();
  };

  const handleFormSubmit = (e) => {
    console.log('Submitted form:', e);
  };

  if (loadError) {
    return <StyledAlert message={loadError} type="error" showIcon />;
  }
  if (!isLoaded) {
    return <StyledSpin />;
  }
  if (geocodeError) {
    return <StyledAlert message={geocodeError} type="error" showIcon />;
  }
  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={position}
        data-testid="map"
      >
        <Marker
          position={position}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
          data-testid="map-marker"
        />
      </GoogleMap>
      <StyledForm
        onFinish={handleFormSubmit}
        data-testid="form"
        form={form}
        initialValues={{
          address: '',
          city: '',
          state: '',
          country: '',
        }}
      >
        <StyledItem name="address">
          <StyledInput placeholder="Address" />
        </StyledItem>
        <StyledItem name="city">
          <StyledInput placeholder="City" />
        </StyledItem>
        <StyledItem name="state">
          <StyledInput placeholder="State" />
        </StyledItem>
        <StyledItem name="country">
          <StyledInput placeholder="Country" />
        </StyledItem>
        <StyledButton type="primary" htmlType="submit">
          Submit
        </StyledButton>
      </StyledForm>
    </>
  );
};
export default Location;
