function file () {
  class File {
    constructor (name, isDir = false) {
      this.name = name
      if (isDir) {
        this.children = []
      }
    }

    add (file) {
      if (this.children) {
        this.children.push(file)
      }
    }

    addAll (files) {
      if (this.children) {
        files.forEach(file => {
          this.add(file)
        })
      }
    }

    pre (file, prefix) {
      const realPrefix = prefix ? prefix : ''
      const path = realPrefix + file.name
      console.log(path)

      if (file.children && file.children.length > 0) {
        const nextPrefix = (path === '/' ? path : path + '/')
        file.children.forEach(f => {
          this.pre(f, nextPrefix)
        })
      }
    }

    print () {
      this.pre(this)
    }

  }

  const root = new File('/', true)
  const usr = new File('usr', true)
  usr.add(new File('1.txt'))
  usr.add(new File('2.txt'))

  const bin = new File('bin', true)
  bin.add(new File('run.js'))
  const src = new File('src', true)
  src.add(new File('index.js'))
  src.add(new File('component.js'))
  bin.add(src)

  root.add(usr)
  root.add(bin)

  root.print()

}

module.exports = {
  file
}