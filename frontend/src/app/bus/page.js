import React from 'react'
import Busbookform from '@/components/bus/busbookform'
import Busoffer from '@/components/bus/busoffer';
import Buspoproot from '@/components/bus/buspoproot';
import Buswhybookus from '@/components/bus/buswhybookus';
import Busfnq from '@/components/bus/busfnq';
const page = () => {
  return (
    <div>
        <Busbookform/>
        <Busoffer/>
        <Buspoproot/>
        <Buswhybookus/>
        <Busfnq/>
    </div>
  )
}

export default page
