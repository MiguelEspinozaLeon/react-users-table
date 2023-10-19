
import { useEffect, useMemo, useRef, useState } from 'react'
import { type User } from './types'
import './App.css'
import axios from 'axios'

type sorting = 'none' | 'firstname' | 'lastname' | 'country'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [sorting, setSorting] = useState<sorting>('none');
  //const [originalUsers, setOriginalUsers] = useState<User[]>([])
  const [isRowColored, setIsRowColored] = useState(false);
  const [isSortedByCountry, setIsSortedByCountry] = useState(false);
  const [filterCountry, setFilterCountry] = useState('');

  const originalUsers = useRef<User[]>([])


  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        console.log(res.results);
        setUsers(res.results);
        originalUsers.current = res.results; 
      })
      .catch(err => {
        console.error(err)
      })
  },[])

  const toggleSortByCountry = ()=> {
    const sortingvalue = sorting === 'none' ? 'country' : 'none'
    setSorting(sortingvalue);
  }

  const handleSort = (sort: sorting) =>{
    setSorting(sort);
  }

  const filteredUsers = useMemo(()=>{
      return filterCountry != null && filterCountry.length > 0 ? 
      users.filter(user=>{return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())}) : users
  },[users, filterCountry]);


  const sortedUsers = useMemo(()=>{
      if(sorting == 'none') return filteredUsers;

      const compareProperties: Record<string, (user: User) => any> = {
        ['country']: user => user.location.country,
        ['firstname']: user => user.name.first,
        ['lastname']: user => user.name.last
      }
      
      return filteredUsers.toSorted((a, b) => {
        const extractProperty = compareProperties[sorting]
        return extractProperty(a).localeCompare(extractProperty(b))
      })

  },[filteredUsers, sorting])

 

  

  return (
    <>
      <div className='container flex flex-col items-center gap-8'>
        <div className='flex flex-row items-center gap-4'>
            <button className={`bg-sky-500 p-4 rounded-lg text-slate-50 font-bold ${isRowColored ? 'outline outline-offset-2 outline-4 outline-blue-500' : ''}`} onClick={()=>{setIsRowColored(!isRowColored)}}>Color the Rows</button>
            <button className={`bg-sky-500 p-4 rounded-lg text-slate-50 font-bold ${isSortedByCountry ? 'outline outline-offset-2 outline-4 outline-blue-500' : ''}`} onClick={toggleSortByCountry}>Sort By Country</button>
            <button className='bg-sky-500 p-4 rounded-lg text-slate-50 font-bold' onClick={()=>{setUsers(originalUsers.current)}}>Go back to initial state</button>
            <input className='border-2 border-black p-2' placeholder='Search by country' type="text" name="" id="" onChange={(e)=>{setFilterCountry(e.target.value)}} />
        </div>
        
        <table className='w-full table-auto'>
          <thead>
              <tr>
                <th>Foto</th>
                <th className='cursor-pointer' onClick={()=>{handleSort('firstname')}}>Nombre</th>
                <th className='cursor-pointer' onClick={()=>{handleSort('lastname')}}>Apellido</th>
                <th className='cursor-pointer' onClick={()=>{handleSort('country')}}>Pais</th>
                <th>Acciones</th>
              </tr>
          </thead>
          <tbody>
              {sortedUsers.map((user: User, index: number)=>(
                  <tr className={`${isRowColored ? 'odd:bg-cyan-200 even:bg-cyan-50'  : ''}`} key={index}>
                    <td className='flex flex-col items-center'>
                      <img src={user.picture.thumbnail} alt="" />
                    </td>
                    <td className='items-center'><p>{user.name.first}</p></td>
                    <td className='items-center'><p>{user.name.last}</p></td>
                    <td className='items-center'><p>{user.location.country}</p></td>
                    <td className='items-center'>
                      <button className='border-2 border-black bg-slate-500 text-white font-semibold p-2' onClick={()=>{
                        setUsers(sortedUsers.filter(u=>u.id.value !== user.id.value))
                      }}>Delete</button>
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>
        
      </div>
    </>
  )
}

export default App
