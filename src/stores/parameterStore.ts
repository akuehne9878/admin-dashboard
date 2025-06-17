import { defineStore } from 'pinia'

export interface Parameter {
  key: string
  name: string
  description: string
  value: string
}

interface State {
  parameters: Parameter[]
}

export const useParameterStore = defineStore('parameter', {
  state: (): State => ({
    parameters: [
      { key: 'host', name: 'Host', description: 'Server host', value: 'localhost' },
      { key: 'port', name: 'Port', description: 'Server port', value: '8080' }
    ]
  }),
  actions: {
    addParameter(param: Parameter) {
      this.parameters.push({ ...param })
    },
    updateParameter(key: string, param: Parameter) {
      const idx = this.parameters.findIndex(p => p.key === key)
      if (idx !== -1) this.parameters[idx] = { ...param }
    },
    deleteParameter(key: string) {
      this.parameters = this.parameters.filter(p => p.key !== key)
    }
  }
})