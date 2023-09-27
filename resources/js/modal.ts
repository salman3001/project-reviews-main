type Role = { name: string; id: number }
type Roles = Role[]

export const modal = () => {
  const modal = document.getElementById('modal') as HTMLInputElement
  const modalContent = document.getElementById('modal-content') as HTMLDivElement

  const togelModal = (e: MouseEvent) => {
    const modalType = (e.target as HTMLButtonElement).dataset.modal

    if (modalType === 'userDeleteForm') {
      ;(document.getElementById('modal-title') as HTMLDivElement).innerHTML = 'Delete User'
      ;(document.getElementById('modal-desc') as HTMLDivElement).innerHTML =
        'This action can not be undone'
      const action = (e.target as HTMLButtonElement).dataset.action as string
      const csrf = (e.target as HTMLButtonElement).dataset.csrf as string
      modalContent.innerHTML = userDeletForm(action, csrf)
    }

    if (modalType === 'userBanForm') {
      ;(document.getElementById('modal-title') as HTMLDivElement).innerHTML = 'Ban User'
      ;(document.getElementById('modal-desc') as HTMLDivElement).innerHTML =
        'Set the user state to inactive'
      const action = (e.target as HTMLButtonElement).dataset.action as string
      const csrf = (e.target as HTMLButtonElement).dataset.csrf as string
      modalContent.innerHTML = userBanForm(action, csrf)
    }

    if (modalType === 'changeRoleForm') {
      ;(document.getElementById('modal-title') as HTMLDivElement).innerHTML = 'Change User Role'
      ;(document.getElementById('modal-desc') as HTMLDivElement).innerHTML =
        'Set user role to assign diffrent permissions'
      const action = (e.target as HTMLButtonElement).dataset.action as string
      const csrf = (e.target as HTMLButtonElement).dataset.csrf as string
      const roles = JSON.parse(
        (e.target as HTMLButtonElement).dataset.roles as string
      ) as unknown as Roles

      let currentRole = (e.target as HTMLButtonElement).dataset.currentRole as unknown as Role

      if (currentRole) {
        currentRole = JSON.parse(currentRole as unknown as string) as unknown as Role
      }
      modalContent.innerHTML = changeRoleForm(action, csrf, roles, currentRole)
    }

    modal.checked = true
  }

  const togelElem = document.querySelectorAll('[data-modal]') as unknown as HTMLButtonElement[]

  if (modal && togelElem.length > 0) {
    for (let i = 0; i < togelElem.length; i++) {
      const element = togelElem[i]
      element.addEventListener('click', togelModal)
    }
  }
}

const userDeletForm = (action: string, csrf: string) => `
<form class="space-y-8 py-3 flex flex-col justify-center items-center" action="${action}" method="post">
${csrf}
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
  class="w-16 h-16">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
<p class="text-base-400 font-semibold"> Do you want to delete this user?</p>
<div class="flex justify-end gap-4 w-full">
  <label class="cursor-pointer btn btn-sm min-w-[6rem] text-base-400 bg-base-200 " for="modal">No</label>
  <button type="submit" class="btn btn-sm btn-primary min-w-[6rem]">Yes</button>
</div>
</form>
`

const userBanForm = (action: string, csrf: string) => `
<form class="space-y-8 py-3 flex flex-col justify-center items-center" action="${action}" >
${csrf}
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
  class="w-20 h-20">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
</svg>
<p class="text-base-400 font-semibold"> Do you want to delete this user?</p>
<div class="flex justify-end gap-4 w-full">
  <label class="cursor-pointer btn btn-sm min-w-[6rem] text-base-400 bg-base-200 " for="modal">No</label>
  <button type="submit" class="btn btn-sm btn-primary min-w-[6rem]">Yes</button>
</div>
</form>
`

const changeRoleForm = (action: string, csrf: string, roles: Roles, currentRole: Role) => `
<form class="space-y-8 py-3 flex flex-col justify-center items-center" action="${action}">
${csrf}
<div class="grid grid-cols-2 w-full">

${roles
  .map(
    (role) => `
<div class="form-control">
<label class="label cursor-pointer gap-2 justify-center">
  <input type="radio" name="roleId" class="radio checked:bg-primary" value=${role.id} ${
    currentRole && currentRole.name === role.name && 'checked'
  } />
  <span class="label-text">${role.name}</span>
</label>
</div>
`
  )
  .join('')}
</div>

<div class="flex justify-end gap-4 w-full">
  <label class="cursor-pointer btn btn-sm min-w-[6rem] text-base-400 bg-base-200 " for="modal">No</label>
  <button type="submit" class="btn btn-sm btn-primary min-w-[6rem]">Yes</button>
</div>
</form>
`
