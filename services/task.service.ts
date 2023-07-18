// const BASE_URL = 'https://serverx.fly.dev/api/tasks'
const BASE_URL = 'http://localhost:4001/api/tasks'

export type TaskT = {
  title: string
  description: string
  id: string
  is_active: boolean
}

type NewTaskT = Omit<TaskT, 'id'>

/**
 * Create a Task
 * @param newTask
 * @returns
 */
export const createTask = async (newTask: NewTaskT) => {
  const response = (await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  })) as Response

  return response
}

/**
 *
 * @returns Get Tasks
 */
export const getTasks = async () => {
  const blob = await fetch(BASE_URL)
  const { data } = await blob.json()
  return data
}

/**
 * Delete Task
 * @param task
 */
export const deleteTask = async (taskId: string) => {
  const resp = await fetch(`${BASE_URL}/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const updateTask = async (task: TaskT) => {
  const body = {
    id: task.id,
    task: task,
  }
  const response = (await fetch(`${BASE_URL}/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })) as Response

  return response
}
