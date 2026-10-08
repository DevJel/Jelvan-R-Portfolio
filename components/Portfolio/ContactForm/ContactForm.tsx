import React from 'react';
import * as Styled from './ContactForm.styles';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import FormikTextField from '../FormikTextField/FormikTextField';
import ActionButton from '../ActionButton/ActionButton';
import { FiSend } from 'react-icons/fi';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const validationSchema = yup.object({
  name: yup.string().required('Please introduce Yourself'),
  email: yup.string().email('Email is incorrect').required('Please add email'),
  message: yup.string().required('Please leave some message'),
});

/**
 *Renders contact form for sending messages
 *@function ContactForm
 *@returns {JSX.Element} - Rendered ContactForm component
 */
const ContactForm = (): JSX.Element => {
  const { sendContactMessage } = useActions();
  const { isEmailSending, isEmailSent, error } = useTypedSelector(
    (state) => state.contact
  );

  const buttonText = isEmailSent
    ? 'Sent'
    : error
    ? 'Not sent, retry'
    : 'Shoot';

  return (
    <Styled.Container>
      <Formik
        initialValues={{ email: '', name: '', message: '', company: '' }}
        validationSchema={validationSchema}
        onSubmit={async (data) => {
          await sendContactMessage(data);
        }}
      >
        <Form>
          <Styled.Wrapper>
            <FormikTextField placeholder="name" name="name" type="text" />
            <FormikTextField placeholder="email" name="email" type="text" />
          </Styled.Wrapper>
          <FormikTextField placeholder="message" name="message" type="text" />
          {/* Honeypot: hidden from people, bots fill it in */}
          <Field
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-10000px', opacity: 0 }}
          />
          <ActionButton
            buttonText={buttonText}
            title={error ?? undefined}
            icon={<FiSend className={'action-icon'} />}
            isLoading={isEmailSending}
            disabled={isEmailSent}
            type="submit"
          />
        </Form>
      </Formik>
    </Styled.Container>
  );
};

export default ContactForm;
