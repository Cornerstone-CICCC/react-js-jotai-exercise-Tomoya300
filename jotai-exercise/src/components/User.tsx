import { useAtom } from "jotai";
import { ageAtom, firstNameAtom, hobbiesAtom, lastNameAtom } from "../atoms/user.atom";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

type U = {
  firstname: string,
  lastname: string,
  age: string,
  hobbies: string[]
}

const User = () => {
  const [fname, setFname] = useAtom(firstNameAtom)
  const [lname, setLname] = useAtom(lastNameAtom)
  const [age, setAge] = useAtom(ageAtom)
  const [hobbies, setHobbies] = useAtom(hobbiesAtom)
  const [userInput, setUserInput] = useState<U>({
    firstname: '',
    lastname: '',
    age: '',
    hobbies: []
  })

  const hobbiesList = [
    'Hiking',
    'Cycling',
    'Playing an instrument',
    'Singing',
    'Video gaming',
    'Cooking',
    'Watching movies',
    'Traveling',
    'Reading bookis'
  ]


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFname(userInput.firstname)
    setLname(userInput.lastname)
    setAge(Number(userInput.age))
    setHobbies(userInput.hobbies)

    toast.success('User created successfully')
    setUserInput({
      firstname: '',
      lastname: '',
      age: '',
      hobbies: []
    })

  }

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">User Information</h1>
      <p className="text-lg">Name: <span>{fname}</span> <span>{lname}</span></p>
      <p className="text-lg">Age: <span>{age === 0 ? '' : age}</span></p>
      <p className="text-lg">Hobbies: <span>{hobbies.join(', ')}</span></p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col w-1/2">
        <label htmlFor="firstname">First Name</label>
        <input type="text" required placeholder="Enter first name..." value={userInput.firstname} onChange={e => setUserInput(state => ({
          ...state,
          firstname: e.target.value
        }))} className="shadow-[0_0_1px] rounded-lg pl-2 py-1 mb-4 mt-2"/>
        <label htmlFor="lastname">Last Name</label>
        <input type="text" required placeholder="Enter last name..." value={userInput.lastname} onChange={e => setUserInput(state => ({
          ...state,
          lastname: e.target.value
        }))} className="shadow-[0_0_1px] rounded-lg pl-2 py-1 mb-4 mt-2"/>
        <label htmlFor="age">Age</label>
        <input type="text" required placeholder="Enter age..." value={userInput.age} onChange={e => setUserInput(state => ({
          ...state,
          age: e.target.value
        }))} className="shadow-[0_0_1px] rounded-lg pl-2 py-1 mb-4 mt-2"/>
        <div>
          <h2 className="text-xl mb-2">Hobbies</h2>
          {hobbiesList.map((hobby, index) => (
            <div className="mb-2 ml-2">
              <label key={index}>
                <input type="checkbox" value={hobby} checked={userInput.hobbies.includes(hobby)} onChange={e => setUserInput(state => ({
                  ...state,
                  hobbies: e.target.checked 
                  ? [...userInput.hobbies, e.target.value]
                  : userInput.hobbies.filter(h => h !== e.target.value)
                }))} className="scale-125"/>
                <span className="pl-2">{hobby}</span>
              </label>
            </div>
          ))}
        </div>
        <button className="border rounded-lg p-2 hover:bg-gray-200 transition mt-4">Submit</button>
      </form>
    </div>
  )
}

export default User