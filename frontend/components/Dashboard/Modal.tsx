import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { styled } from '@stitches/react';

const Overlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  inset: 0,
});

const Content = styled(Dialog.Content, {
  backgroundColor: 'white',
  borderRadius: 8,
  padding: '20px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '450px',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '&:focus': { outline: 'none' },
});

const Title = styled('h2', {
  fontSize: '1.25rem',
  margin: '0',
  marginBottom: '15px',
});

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '10px 15px',
  fontSize: '1rem',
  lineHeight: '1',
  fontWeight: 500,
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  margin: '10px',
});

const Modal = ({ isOpen, onConfirm, onCancel, title, description }) => {
  return (
    <Dialog.Root open={isOpen}>
      <Overlay />
      <Content>
        <Title>{title}</Title>
        <p>{description}</p>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Start</Button>
        </div>
      </Content>
    </Dialog.Root>
  );
};

export default Modal;
