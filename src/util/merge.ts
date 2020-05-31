const merge = <T extends object>(obj1: T, obj2: T): T => {
  // TODO: implement merge function
  return {obj1, ...obj2}
}

export default merge
