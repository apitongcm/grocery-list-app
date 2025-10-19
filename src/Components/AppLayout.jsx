import React from 'react'
import Intro from './Intro';
import InputItem from './InputItem';
import Header from './Header';



function Mainsection() {
  return (
    <>
    <Header/>
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <main className="container mx-auto px-15 py-6">
            <Intro/>
            <InputItem/>
        </main>
   </div>
   </>
  );
}

export default Mainsection