'use client';

import React from 'react'
import Mock from '@/components/MockTest';
import { NextPage } from 'next';

const MockPage = () => {
  return (
    <div>
        <Mock />
    </div>
  )
}

MockPage.disableLayout = true;

export default MockPage;