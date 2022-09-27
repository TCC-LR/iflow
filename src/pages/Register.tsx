import { Header } from '../components/Header'
import { LockSimple } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../Config'

export function Register() {
  function handleCreateAccount() {
    const name = (document.getElementById('register-name') as HTMLInputElement)
      .value
    const email = (
      document.getElementById('register-email') as HTMLInputElement
    ).value
    const password = (
      document.getElementById('register-password') as HTMLInputElement
    ).value

    const data = JSON.stringify({
      name,
      email,
      password,
    })
    fetch(`${baseUrl}/user`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = '/login'
        } else {
          alert('Senhas não conferem')
        }
      })
      .catch((err) => {
        alert('Senhas não conferem')
        console.log(err)
      })
  }

  return (
    <div>
      <Header hasTitle={false} />
      <div className="mt-[73px] w-[800px] h-[702px] bg-green-400 mx-auto rounded-lg">
        <h1 className="text-center inline-block mt-[98px] w-full font-[Handlee] text-[50px] text-blue-400">
          CADASTRO
        </h1>
        <form action="">
          <div className="flex items-center justify-center text-center w-full mt-[99px]">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <LockSimple size={23} />
              </span>
              <input
                id="register-name"
                className="px-10 text-[22px] font-white placeholder-white-200 font-sans border border-blue-400 rounded w-[690px] h-[67px] bg-transparent focus:outline-none"
                type="text"
                placeholder="Nome"
              ></input>
            </div>
          </div>
          <div className="flex items-center justify-center text-center w-full mt-7">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <LockSimple size={23} />
              </span>
              <input
                id="register-email"
                className="px-10 text-[22px] font-white placeholder-white-200 font-sans border border-blue-400 rounded w-[690px] h-[67px] bg-transparent focus:outline-none"
                type="text"
                placeholder="Email"
              ></input>
            </div>
          </div>
          <div className="flex items-center justify-center mt-7 gap-[10px]">
            <div className="">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <LockSimple size={23} />
                </span>
                <input
                  id="register-password"
                  className="px-10 text-[22px] font-white placeholder-white-200 font-sans border border-blue-400 rounded w-[340px] h-[67px] bg-transparent focus:outline-none"
                  type="password"
                  placeholder="Senha"
                ></input>
              </div>
            </div>
            <div className="">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <LockSimple size={23} />
                </span>
                <input
                  className="px-10 text-[22px] font-white placeholder-white-200 font-sans border border-blue-400 rounded w-[340px] h-[67px] bg-transparent focus:outline-none"
                  type="password"
                  placeholder="Confirmar Senha"
                ></input>
              </div>
            </div>
          </div>
        </form>
        <div className="flex mt-[61px] w-full justify-center">
          <div className="w-[690px] flex gap-4 justify-end">
            <Link to="/">
              <button className="border border-blue-400 w-[186px] h-[61px] bg-blue-400 rounded-lg text-[24px] text-white-200">
                Voltar
              </button>
            </Link>
            {/* <Link to="/projects"> */}
            <button
              type="submit"
              className="border border-blue-400 w-[186px] h-[61px] bg-blue-400 rounded-lg text-[24px] text-white-200"
              onClick={handleCreateAccount}
            >
              Cadastrar
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}
