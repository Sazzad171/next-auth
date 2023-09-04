'use client'

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';

const signInPage = () => {
  const router = useRouter();
  const { data:session } = useSession();

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  // const handleSignin = async (e) => {
  //   e.preventDefault();
  //   console.log(formValue);

  //   try {
  //     const res = await signIn("Credentials", {
  //       email: formValue.email,
  //       password: formValue.password,
  //       redirect: false
  //     });
  
  //     console.log(res);
  
  //     if (!res?.error) {
  //       router.push('/dashboard');
  //     } else {
  //       console.log("invalid email or password");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleFormSubmit = async (values, setSubmitting) => {
    try {
      // trigger nextauth signin function
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false // page won't reload
      });

      setSubmitting(false);

      console.log(res);

      // if valid credentials then login
      if (res?.ok && res?.error === null) {
        console.log("login status i", res);
        router.push("/dashboard");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    }
  }, [])

  return (
    <div>
      {/* <form method='post' onSubmit={(e) => handleSignin(e)}>
        <label>
          Username
          <input type="email" value={formValue.email} onChange={(e) => setFormValue({...formValue, email: e.target.value})} className='text text-black' />
        </label>
        <label>
          Password
          <input type="password" value={formValue.password} onChange={(e) => setFormValue({...formValue, password: e.target.value})} className='text text-black' />
        </label>
        <button type="submit">Sign in</button>
      </form> */}

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => handleFormSubmit(values, setSubmitting)}
      >
        {
          ({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            errors,
            touched
          }) => (
            <Box component={"form"} onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  type='email'
                  id='email'
                  fullWidth
                  label="Email"
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                />
                {
                  errors.email && touched.email ? 
                    <Typography color="red">{errors.email}</Typography> :
                    ''
                }
              </Box>
              <Box mb={2}>
                <TextField
                  type='password'
                  id='password'
                  fullWidth
                  label="password"
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                />
                {
                  errors.password && touched.password ? 
                    <Typography color="red">{errors.password}</Typography> :
                    ''
                }
              </Box>
              <Button fullWidth variant="contained" sx={{background: "#aaa !important"}} type='submit' disabled={isSubmitting}>Submit</Button>
            </Box>
          )
        }
      </Formik>
    </div>
  )
}

export default signInPage;