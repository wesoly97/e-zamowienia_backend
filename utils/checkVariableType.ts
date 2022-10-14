const REGEX_LETTERS_OR_NUMBERS = /^[A-Za-z0-9]*$/

export const isCharLetterOrNumber= (char: string) => REGEX_LETTERS_OR_NUMBERS.test(char)
