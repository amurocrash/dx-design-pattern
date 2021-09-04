function normal () {
  class TV {
    constructor () {
      this.channel = 1
    }

    on () {
      console.log('TV on, and channel is ' + this.channel)
    }

    change (isAdd = true) {
      if (isAdd) {
        this.channel += 1
      } else {
        this.channel -= 1
      }
      console.log('TV change channel to ' + this.channel)
    }

    off () {
      console.log('TV off')
    }
  }

  class Command {
    constructor (tv) {
      this.tv = tv
    }

    execute () {

    }

    undo () {

    }
  }

  class OnCommand extends Command {
    execute () {
      this.tv.on()
    }

    undo () {
      this.tv.off()
    }
  }

  class OffCommand extends Command {
    execute () {
      this.tv.off()
    }

    undo () {
      this.tv.on()
    }
  }

  class ChangeCommand extends Command {
    execute () {
      this.tv.change()
    }

    undo () {
      this.tv.change(false)
    }
  }

  class CommandManager {
    constructor () {
      this.undoStack = []
      this.redoStack = []
    }

    execute (command) {
      this.redoStack.length = 0
      this.undoStack.push(command)
      command.execute()
    }

    undo () {
      const command = this.undoStack.pop()
      if (command) {
        command.undo()
        this.redoStack.push(command)
      }
    }

    redo () {
      const command = this.redoStack.pop()
      if (command) {
        command.execute()
        this.undoStack.push(command)
      }
    }
  }

  const tv = new TV()

  const commandManager = new CommandManager()
  commandManager.execute(new OnCommand(tv))
  commandManager.execute(new ChangeCommand(tv))
  commandManager.execute(new ChangeCommand(tv))
  commandManager.execute(new ChangeCommand(tv))
  commandManager.execute(new OffCommand(tv))

  commandManager.undo()
  commandManager.undo()
  commandManager.undo()

  commandManager.redo()
  commandManager.redo()
}

module.exports = {
  normal
}