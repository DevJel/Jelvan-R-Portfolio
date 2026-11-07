import React, { useEffect, useRef } from 'react';
import * as Styled from './ContactForm.styles';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import FormikTextField from '../FormikTextField/FormikTextField';
import ActionButton from '../ActionButton/ActionButton';
import { FiSend } from 'react-icons/fi';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const validationSchema = yup.object({
  name: yup.string().required('Please introduce Yourself'),
  email: yup.string().email('Email is incorrect').required('Please add email'),
  message: yup.string().required('Please leave some message'),
});

/**
 * Plays a short, subtle two-note confirmation chime after a successful send.
 * Audio is generated locally; no sound file or external request is required.
 */
const createConfirmationAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;

  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextClass) return null;

  try {
    return new AudioContextClass();
  } catch {
    return null;
  }
};

const playSendConfirmation = (context: AudioContext | null): void => {
  if (!context) return;

  try {
    const now = context.currentTime;

    [659.25, 880].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startAt = now + index * 0.12;

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, startAt);
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(0.12, startAt + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.2);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startAt);
      oscillator.stop(startAt + 0.22);
    });

  } catch {
    // Audio is an enhancement only; confirmation must still work if unavailable.
  }
};

/**
 * Renders the contact form and confirms successful message delivery.
 */
const ContactForm = (): JSX.Element => {
  const { sendContactMessage } = useActions();
  const { isEmailSending, isEmailSent, error } = useTypedSelector(
    (state) => state.contact
  );
  const hasPlayedSuccessSound = useRef(false);
  const confirmationAudioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (isEmailSent && !hasPlayedSuccessSound.current) {
      hasPlayedSuccessSound.current = true;
      playSendConfirmation(confirmationAudioContext.current);
    }

    if (!isEmailSent) {
      hasPlayedSuccessSound.current = false;
    }
  }, [isEmailSent]);

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
          // Unlock audio while the submit gesture is active; play only on confirmed success.
          if (!confirmationAudioContext.current) {
            confirmationAudioContext.current = createConfirmationAudioContext();
            void confirmationAudioContext.current?.resume().catch(() => undefined);
          }
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
          {error && (
            <p role="alert" style={{ marginTop: '1rem', lineHeight: 1.5 }}>
              Your message was not sent. You can email me directly at{' '}
              <a href="mailto:hello@work.jelvan.pro">
                hello@work.jelvan.pro
              </a>
              .
            </p>
          )}
        </Form>
      </Formik>
    </Styled.Container>
  );
};

export default ContactForm;
