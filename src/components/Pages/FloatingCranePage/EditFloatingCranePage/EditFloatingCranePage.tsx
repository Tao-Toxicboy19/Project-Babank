import React from 'react'
import { useParams } from 'react-router-dom';

type Props = {}

export default function EditFloatingCranePage({}: Props) {
  const { id } = useParams();

  return (
    <div>EditFloatingCranePage{id}</div>
  )
}