
declare global {
    interface Array<T> {
      toSorted(compareFn?: (a: T, b: T) => number): T[]
    }
  }


export type Id = {
    name: string,
    value: string
}

export type Login = {
    md5: string,
    password: string,
    salt: string,
    sha1: string,
    sha256: string,
    username: string,
    uuid: string
}

export type Dob = {
    age: number,
    date: string
}

export type Location = {
    city: string,
    coordinates: {
        latitude: string,
        longitude: string
    },
    country: string,
    postcode: string,
    state: string,
    street: {
        number: number,
        name: string
    },
    timezone: {
        description: string,
        offset: string
    }

}

export type Name = {
    first: string, 
    last: string,
    title: string
}

export type Picture = {
    large: string,
    medium: string,
    thumbnail: string
}

export type Registered = {
    age: number, 
    date: string
}

export type User = {
    cell: string,
    dob: Dob,
    email: string,
    gender: string,
    id: Id,
    location: Location,
    login: Login,
    name: Name,
    nat: string,
    phone: string,
    picture: Picture,
    registered: Registered
}