export interface TUserProfile {
    shippingAddress: ShippingAddress
    _id: string
    name: string
    email: string
    role: string
    isBlocked: boolean
    createdAt: string
    updatedAt: string
}

export interface ShippingAddress {
    address1: string
    address2: string
    city: string
    state: string
    zipCode: string
    country: string
}
