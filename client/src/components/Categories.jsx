import React from 'react';

import Categorie from './Categorie';

const Categories = () => {
  return (
    <section className='p-8' id='categories'>
      <div className='grid gap-2 md:grid-cols-3 mb-2'>
        <Categorie
          name='Clothes'
          image='https://api.lorem.space/image/fashion?w=640&h=480&r=3529'
        />
        <Categorie
          name='Shoes'
          image='https://contents.mediadecathlon.com/p2393841/97ec4616ea32d8eaa67ee3c30d2eafd2/p2393841.jpg?format=auto&quality=70&f=650x0'
        />
        <Categorie
          name='Electronics'
          image='https://bsmedia.business-standard.com/_media/bs/img/article/2024-04/15/full/1713205770-8994.jpg?im=FitAndFill=(826,465)'
        />
      </div>
      <div className='grid gap-2 md:grid-cols-2'>
        <Categorie
          name='Furniture'
          image='https://d1hy6t2xeg0mdl.cloudfront.net/image/726909/308cb4788c/800-width'
        />
        <Categorie
          name='Others'
          image='https://api.lorem.space/image?w=640&h=480&r=1848'
        />
      </div>
    </section>
  );
};

export default Categories;
