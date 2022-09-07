import { Header } from '../components/Header'

export function Dashboard() {
  return (
    <div>
      <Header hasTitle title="Dashboard" />
      <div className="w-full h-[929px] p-[100px]">
        <div className="w-full h-full bg-green-400"></div>
      </div>
    </div>
  )
}
