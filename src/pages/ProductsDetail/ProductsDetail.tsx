import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailBreadCrumb from './atomic/ProductDetailBreadCrumb';
import ProductBasicInfo from './atomic/ProductBasicInfo';
import ProductDetailInfo from './atomic/ProductDetailInfo';

const ProductsDetail = () => {

    const { id } = useParams();

  return (
    <div className='flex flex-col'>
      <div className="header flex items-center bg-white py-4 fixed h-4 w-full z-10">
      <ProductDetailBreadCrumb id={id}/>
      </div>

      <div className='pt-8'>
      <ProductBasicInfo reg_number={id!}/>
      </div>
      <div className='md:mt-4 mt-64'>
      <ProductDetailInfo/>
      </div>
    </div>
  )
}

export default ProductsDetail
