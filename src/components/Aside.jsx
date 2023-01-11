import { useState } from 'react'
import CreateTask from './CreateTask'

const Aside = () => {
  const [modal, setModal] = useState(false)

  return (
    <>
      <aside>
        <button onClick={() => setModal(true)}>Add task to the list</button>
      </aside>
      <CreateTask modal={modal} setModal={setModal} />
    </>
  )
}

export default Aside
