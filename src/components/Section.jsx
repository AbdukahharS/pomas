import { useContext } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { ProfileContext } from '../context/ProfileContext'
import { MdDeleteOutline } from 'react-icons/md'
import { firestore } from '../config/firebase'

const Section = () => {
  const { taskList, dispatch } = useContext(ProfileContext)

  const handleDelete = async (id) => {
    if (
      window.confirm(`This operation will delete the task permanently.`) ===
      true
    ) {
      const newList = taskList.list.filter((task) => task.id !== id)

      try {
        const docRef = doc(firestore, 'taskLists', taskList.id)

        await updateDoc(docRef, {
          list: newList,
        })

        dispatch({
          type: 'SET_TASK_LIST',
          payload: { id: taskList.id, list: newList },
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleChange = async (e) => {
    const newList = taskList.list.map((task) => {
      if (task.id === e.target.id) {
        return { ...task, isDone: e.target.checked }
      } else {
        return task
      }
    })

    try {
      const docRef = doc(firestore, 'taskLists', taskList.id)
      await updateDoc(docRef, { list: newList })
      dispatch({
        type: 'SET_TASK_LIST',
        payload: { id: taskList.id, list: newList },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section>
      <article>
        <h1>You should complete these today:</h1>
        <div className='table'>
          {taskList.list &&
            taskList.list.length &&
            taskList.list.map((task, i) => (
              <div className={'row' + (task.isDone ? ' done' : '')} key={i}>
                <div>{i + 1}</div>
                <div>{task.content}</div>
                <div>{task.duration} mins</div>
                <div>
                  {!task.isDone
                    ? `${task.progress || 0} mins done`
                    : 'complete'}
                </div>
                <div>{task.startTime}</div>
                <div>
                  <input
                    type='checkbox'
                    checked={task.isDone ? task.isDone : false}
                    onChange={(e) => handleChange(e)}
                    id={task.id}
                  />
                </div>
                <div className='btn-cont'>
                  <button onClick={() => handleDelete(task.id)}>
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </article>
      <article></article>
    </section>
  )
}

export default Section
