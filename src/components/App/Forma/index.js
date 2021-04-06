import React from 'react';
import './Forma.css';
import {userDetailContext} from "../App";
import { Formik, Form, Field} from 'formik';

function validateName(value) {
  return (
  !value ? 'Заполните поле' : undefined
)}

function Forma(props) {

var contextData = React.useContext(userDetailContext);

  return (
    <div className="form">
    {console.log(contextData)}

<h2>Адрес</h2>
      <Formik                     // иммитация получения данных
        initialValues={{
          country: contextData.country,
          city: contextData.city,
          index:contextData.index,
          street:contextData.street,
          streettype: contextData.streettype,
          roomtype: contextData.roomtype,
          roomnumber: contextData.roomnumber
        }}
        onSubmit={(values) => { console.log(values)}}
      >
      {({ errors, touched }) => (
        <Form className="form-container">
          <label htmlFor="country" className="form-container-label">Страна</label>
          <Field name="country" type="text" validate={validateName} />
          {errors.country && touched.country && (
            <div className="field-error">{errors.country}</div>
          )}

          <label htmlFor="city" className="form-container-label">Город</label>
          <Field name="city" type="text" validate={validateName} />
          {errors.city && touched.city && (
            <div className="field-error">{errors.city}</div>
          )}

          <label htmlFor="index" className="form-container-label">Индекс</label>
          <Field name="index" type="text" validate={validateName} />
          {errors.index && touched.index && (
            <div className="field-error">{errors.index}</div>
          )}

          <label htmlFor="street" className="form-container-label">Улица</label>
          <Field name="street" type="text" validate={validateName} />
          {errors.street && touched.street && (
            <div className="field-error">{errors.street}</div>
          )}

          <label htmlFor="streettype" className="form-container-label">Тип улицы</label>
          <Field name="streettype" type="text" validate={validateName} />
          {errors.streettype && touched.streettype && (
            <div className="field-error">{errors.streettype}</div>
          )}

          <label htmlFor="roomtype" className="form-container-label">Тип помещения</label>
          <Field name="roomtype" type="text" validate={validateName} />
          {errors.roomtype && touched.roomtype && (
            <div className="field-error">{errors.roomtype}</div>
          )}

          <label htmlFor="roomnumber" className="form-container-label">Номер помещения</label>
          <Field name="roomnumber" type="text" validate={validateName} />
          {errors.roomnumber && touched.roomnumber && (
            <div className="field-error">{errors.roomnumber}</div>
          )}

          <button type="submit">Далее</button>
        </Form>
   )}
      </Formik>
    </div>
  );
}

export default Forma;
