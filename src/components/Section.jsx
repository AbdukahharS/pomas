import { MdDeleteOutline } from 'react-icons/md'

const Section = () => {
  const handleDelete = (id) => {
    if (
      window.confirm(
        `This operation will delete the task with id ${id} permanently.`
      ) === true
    ) {
    }
  }
  return (
    <section>
      <article>
        <h1>You should complete these today:</h1>
        <div className='table'>
          <div className='row'>
            <div>1</div>
            <div>Read a book</div>
            <div>1 hr</div>
            <div>NA</div>
            <div>
              <input type='checkbox' />
            </div>
            <div className='btn-cont'>
              <button onClick={() => handleDelete(1)}>
                <MdDeleteOutline />
              </button>
            </div>
          </div>
          <div className='row done'>
            <div>2</div>
            <div>Do Pomas project</div>
            <div>4 hrs</div>
            <div>NA</div>
            <div>
              <input type='checkbox' checked readOnly />
            </div>
            <div className='btn-cont'>
              <button>
                <MdDeleteOutline />
              </button>
            </div>
          </div>
          <div className='row done'>
            <div>3</div>
            <div>Take a shower</div>
            <div>NA</div>
            <div>10 pm</div>
            <div>
              <input type='checkbox' checked readOnly />
            </div>
            <div className='btn-cont'>
              <button>
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        </div>
      </article>
      <article></article>
    </section>
  )
}

export default Section
