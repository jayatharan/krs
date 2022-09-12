import Head from 'next/head'
import Image from 'next/image'
import {useRecoilState} from "recoil";
import Dashboard from '../components/home/Dashboard';
import { CategoryListData } from '../recoil/categoryList/CategoryListAtom';
const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {

  return (
    <Dashboard />
  )
}
