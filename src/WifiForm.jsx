import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const WifiFormValidationSchema = Yup.object().shape({
  ssid: Yup.string().required('SSID is required'),
  encryption: Yup.string().required('Encryption is Required'),
  password: Yup.string().required('Password is Required'),
  size: Yup.number()
    .min(300, 'Size is too small')
    .max(500, 'Size is too big!')
    .required('Size is required')
});

export const WifiFormContainer = props => (
  <div className="section">
    <Formik
      initialValues={props.initialValue}
      validationSchema={WifiFormValidationSchema}
      onSubmit={(values, { /* resetForm, setErrors,*/ setSubmitting }) => {
        setSubmitting(false);
        props.handleSubmit(values);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <div className="field">
            <div className="control">
              <label className="label">SSID</label>
              <Field className="input" type="text" name="ssid" placeholder="SSID" />
              {touched.ssid && errors.ssid && <p className="help is-danger">{errors.ssid}</p>}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Password</label>

              <Field className="input" type="password" name="password" placeholder="Password" />
              <p className="help is-info">We never store your password</p>
              {touched.password && errors.password && <p className="help is-danger">{errors.password}</p>}
            </div>
          </div>
          <div className="field">
            <label className="label">Encryption</label>
            <div className="control">
              <div className="select is-fullwidth">
                <Field component="select" name="encryption">
                  <option value="">Select Encryption</option>
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </Field>
                {touched.encryption && errors.encryption && <p className="help is-danger">{errors.encryption}</p>}
              </div>
            </div>
          </div>

          <div className="control">
            <label className="label">QR Image Size</label>
            <Field className="input" type="text" name="size" placeholder="QR Image Size" />
            {touched.size && errors.size && <p className="help is-danger">{errors.size}</p>}
          </div>
          <div className="control">
            <br />
            <label className="label">fgColor</label>
            <Field className="input" type="color" name="fgColor" placeholder="Pick fgColor color" />
          </div>
          <div className="control">
            <label className="label">bgColor</label>
            <Field className="input" type="color" name="bgColor" placeholder="Pick bgColor color" />
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <br />
                <Field type="checkbox" name="includeMargin" /> Inclue margin in QRCode
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <br />
                <Field type="checkbox" name="isHidden" /> Wifi is not visible
              </label>
            </div>
          </div>
          <div className="control">
            <br />
            <button type="submit" className="button " disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);
