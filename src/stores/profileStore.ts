import { defineStore } from 'pinia'

export interface ProfileParam {
  key: string
  value: string
}

export interface Profile {
  id: number
  name: string
  params: ProfileParam[]
}

interface State {
  profiles: Profile[]
  nextId: number
}

export const useProfileStore = defineStore('profile', {
  state: (): State => ({
    profiles: [
      { id: 1, name: 'Development', params: [{ key: 'host', value: 'localhost' }] },
      { id: 2, name: 'Production', params: [{ key: 'host', value: 'prod.server' }, { key: 'port', value: '8080' }] }
    ],
    nextId: 3
  }),
  actions: {
    addProfile(name: string) {
      this.profiles.push({ id: this.nextId, name: name.trim(), params: [] })
      this.nextId++
    },
    updateProfile(id: number, name: string) {
      const profile = this.profiles.find(p => p.id === id)
      if (profile) profile.name = name.trim()
    },
    deleteProfile(id: number) {
      this.profiles = this.profiles.filter(p => p.id !== id)
    },
    assignParam(profileId: number, key: string, value: string) {
      const profile = this.profiles.find(p => p.id === profileId)
      if (!profile) return
      const existing = profile.params.find(p => p.key === key)
      if (existing) {
        existing.value = value
      } else {
        profile.params.push({ key, value })
      }
    },
    removeParam(profileId: number, key: string) {
      const profile = this.profiles.find(p => p.id === profileId)
      if (profile) {
        profile.params = profile.params.filter(p => p.key !== key)
      }
    }
  }
})