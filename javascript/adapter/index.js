function normal () {
  class OldInterface {
    run () {
      console.log('old run')
    }
  }

  class NewInterface {
    exe () {
      console.log('new exe')
    }
  }


  class Adapter extends OldInterface {
    constructor (obj) {
      super()
      this.newObj = obj
    }

    run () {
      this.newObj.exe()
    }
  }

  const newObj = new NewInterface()

  const adapter = new Adapter(newObj)
  adapter.run()
}

function data () {
  const treeData = [
    {
      dept: '技术部',
      owner: 'Jack',
      children: [
        {
          dept: '服务部',
          owner: 'Mary',
          children: [
            {
              dept: '服务1部',
              owner: 'Tom'
            },
            {
              dept: '服务2部',
              owner: 'Jim'
            },
          ]
        }, 
        {
          dept: '前端部',
          owner: 'Kate'
        },
        {
          dept: '客户端部',
          owner: 'Lee',
          children: [
            {
              dept: 'Android部',
              owner: 'Mike'
            },
            {
              dept: 'IOS部',
              owner: 'Char'
            }
          ]
        }
      ]
    }
  ]

  function treeDataAdapter (treeData, newData = []) {
    treeData.forEach(child => {
      if (child.children && child.children.length > 0) {
        treeDataAdapter(child.children, newData)
      } 

      newData.push({ dept: child.dept, owner: child.owner})
    })

    return newData
  }

  console.log(treeDataAdapter(treeData))
}

module.exports = {
  normal,
  data
}