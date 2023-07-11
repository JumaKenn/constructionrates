import React, { useState } from 'react';

import './RegisterForm.css';


import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('https://django-server-production-5811.up.railway.app/apis/register/', {
        username: username,
        email: email,
        password: password,
      });
      navigate('/login')

      console.log(response.data); // Handle success response
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // Handle error response
        setErrorMessage(error.response.data.message); // Store error message in state
      } else {
        console.log('An error occurred:', error.message); // Handle generic error
        setErrorMessage('An error occurred. Please try again.'); // Store generic error message in state
      }
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    // Reset password match error when password is changed
    setPasswordMatchError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== confirmPassword) {
      setPasswordMatchError(true);

      return;

    }
    else {
      setPasswordMatchError(false);

    }

  };

  return (
    <div className='loginregister'>
      <MDBContainer fluid className="p-3 my-5 h-custom">

        <MDBRow>

          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
          </MDBCol>

          <MDBCol col='4' md='6'>



            <form onSubmit={handleRegister}>
              <MDBInput wrapperClass='mb-4' placeholder='Username' id='formControlLg' type='text' size='lg' onChange={(e) => setUsername(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder='Email address' id='formControlLg' type='email' size='lg' onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder='Password' id='formControlLg' type='password' size='lg' onChange={handlePasswordChange} />
              <MDBInput wrapperClass='mb-4' placeholder='Confirm Password' id='formControlLg' type='password' size='lg' onChange={handleConfirmPasswordChange} />

              {passwordMatchError && <p className='link-danger'>Passwords do not match.</p>}




              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn type='submit' className='mb-0 px-5' size='lg'>
                  Register
                </MDBBtn>
                <div className='divider d-flex align-items-center my-4'>
                  <p className='text-center fw-bold mx-3 mb-0'>Or</p>
                </div>
                <div className='d-flex flex-row'>
                  <p className='lead fw-normal mb-0 me-3'>Sign up with</p>
                  <MDBBtn floating size='md' tag='a' className='me-2'>
                    <MDBIcon fab icon='google' />
                  </MDBBtn>
                  <MDBBtn floating size='md' tag='a' className='me-2'>
                    <MDBIcon fab icon='twitter' />
                  </MDBBtn>
                  <MDBBtn floating size='md' tag='a' className='me-2'>
                    <MDBIcon fab icon='linkedin-in' />
                  </MDBBtn>
                </div>
                <p className='small fw-bold mt-2 pt-1 mb-2'>
                  Already have an account? <Link to='/login' className='link-danger'>Login</Link>
                </p>
              </div>
            </form>

          </MDBCol>

        </MDBRow>

      </MDBContainer>

    </div>

  );
};

export default Register;
