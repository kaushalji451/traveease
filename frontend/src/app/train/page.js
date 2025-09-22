import React from 'react'
import Trainbookingform from '@/components/train/trainbookingform'
import Trainwhybookus from '@/components/train/trainwhybookus'
import Trainbookinginfo from '@/components/train/trainbookinginfo'
import Toptrainroutes from '@/components/train/toptrainroot'
import TrainFAQ from '@/components/train/trainfnq'
const page = () => {
  return (
    <div>
        <Trainbookingform/>
        <Toptrainroutes/>
        <Trainbookinginfo/>
        <Trainwhybookus/>
        <TrainFAQ/>
    </div>
  )
}

export default page
