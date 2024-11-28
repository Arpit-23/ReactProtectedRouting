export const regex = {
    name: /^[A-Za-z]{4,15}( [A-Za-z]{2,15})?$/,
    email: /^(?![_.-])[a-z0-9!#$%&'*+/=?^_`{|}~.-]{1,15}(?<![_.-])@[a-z0-9]([a-z0-9-]{2,8}[a-z0-9])?(\.[a-z]{2,4})+$/,
    address: /^(?!\s)(?=.{4,30}$)(?:(\S+)(?:\s+\S+)*)?(?<!\s)$/,
    phone: /^[6-9]\d{9}$/,
    uppercase: /[A-Z]/,
    lowercasse: /[a-z]/,
    number: /\d/,
    specialSymbol: /[!@#$%^&*(),.?":{}|<>]/,
    contactNumber: /^[6-9]\d{9}$/,
    address: /^(?!\s)(?=.{4,30}$)(?:(\S+)(?:\s+\S+)*)?(?<!\s)$/,
}