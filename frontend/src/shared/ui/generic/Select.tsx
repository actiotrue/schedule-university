import React from 'react';

export const Select = ({
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return <select className="select select-bordered w-full" {...props}></select>;
};
