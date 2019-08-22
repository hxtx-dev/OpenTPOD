// @flow

import * as React from "react";
import { Formik } from "formik";
import { LoginPage as TablerLoginPage, Alert } from "tabler-react";
import { fetchJSON, withFormikStatus } from "../util"
import { withRouter } from 'react-router';

type Props = {||};

class LoginPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={values => {
            // same as above, but feel free to move this into a class method now.
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(
            values,
            actions
          ) => {
            const data = {
              'email': values.email,
              'password': values.password
            }
            fetchJSON('/api/session', 'POST', data).then(
              resp => {
                actions.setStatus('Login success: ');
                this.props.history.push('/home')
              }
            ).catch(e => {
              console.error(e);
              actions.setStatus('Login Failed: ' + e);
            })
          }}
          render={({
            values,
            errors,
            touched,
            status,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            let el = <TablerLoginPage
              onSubmit={handleSubmit}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />;
            return withFormikStatus(el, status)
          }
          }
        />
        <div className="text-center text-muted">
          Don't have account yet? <a href="#/register">Sign up</a>
        </div>
      </div >
    );
  }
}

export default withRouter(LoginPage);