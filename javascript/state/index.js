function trafficLight () {
  
  class State {
    invoke () {
      return new Promise(resolve => {
        this.onInvoke()
        setTimeout(() => {
          resolve()
        }, 2000)
      })
    }

    onInvoke () {

    }

    change (trafficLight) {
    }
  }
  
  class RedState extends State {
    onInvoke () {
      console.log('现在是红灯')
    }

    change (trafficLight) {
      trafficLight.setState(TrafficLight.GREEN_STATE)
    }
  }

  class YellowState extends State {
    onInvoke () {
      console.log('现在是黄灯')
    }

    change (trafficLight) {
      trafficLight.setState(TrafficLight.RED_STATE)
    }
  }

  class GreenState extends State {
    onInvoke () {
      console.log('现在是绿灯')
    }

    change (trafficLight) {
      trafficLight.setState(TrafficLight.YELLOW_STATE)
    }
  }

  class TrafficLight {
    static RED_STATE = new RedState()
    static YELLOW_STATE = new YellowState()
    static GREEN_STATE = new GreenState()

    constructor () {
      this.state = null
    }

    async setState (state) {
      this.state = state
      await this.state.invoke()
      this.state.change(this)
    }
  }

  const tl = new TrafficLight()
  tl.setState(TrafficLight.GREEN_STATE)
}

function elevator () {
  class State {
    constructor () {
      this.timeout = null
    }

    invoke () {
      return new Promise(resolve => {
        this.onInvoke()
        this.timeout = setTimeout(() => {
          resolve()
        }, 2000)
      })
    }

    change (elevator, newState) {
      elevator.setState(newState)
    }
  }

  class StopState extends State {
    invoke () {
      console.log('电梯停止运转')
      return new Promise((resolve, reject) => {
        reject()
      })
    }

    change (elevator, newState) {
      if (newState instanceof WaitingState) {
        super.change(elevator, newState)
      } else {
        console.log('电梯停止时只能接受waiting指令')
      }
    }
  }

  class WaitingState extends State {
    invoke () {
      return new Promise((resolve, reject) => {
        console.log('电梯进入waiting状态，可以接受任何指令')
        reject()
      })
    }

    change (elevator, newState) {
      // 只有Waiting状态才能进行其他状态转换
      super.change(elevator, newState)
    }
  }

  class OpenState extends State {
    onInvoke () {
      console.log('电梯打开')
    }

    change (elevator, newState) {
      if (!newState) {
        newState = Elevator.CLOSE_STATE
      }

      if (newState instanceof CloseState) {
        super.change(elevator, newState)
      } else {
        console.log('电梯open后只能接受close指令')
      }
    }
  }

  class CloseState extends State {
    onInvoke () {
      console.log('电梯关闭')
    }

    change (elevator, newState) {
      if (!newState) {
        newState = Elevator.WAITING_STATE
      }

      if (newState instanceof WaitingState) {
        super.change(elevator, newState)
      } else {
        console.log('电梯close后只能接受waiting指令')
      }
    }
  }

  class RunningState extends State {
    onInvoke () {
      console.log('电梯上行')
    }

    change (elevator, newState) {
      if (!newState) {
        newState = Elevator.WAITING_STATE
      }

      if (newState instanceof WaitingState) {
        super.change(elevator, newState)
      } else {
        console.log('电梯运行完成只能接受Waiting指令')
      }
    }
  }

  class Elevator {
    static STOP_STATE = new StopState()
    static WAITING_STATE = new WaitingState()
    static OPEN_STATE = new OpenState()
    static CLOSE_STATE = new CloseState()
    static RUNING_STATE = new RunningState()

    constructor () {
      this.setState(Elevator.STOP_STATE)
    }

    async setState (state) {
      this.state = state
      try {
        await this.state.invoke()
        this.state.change(this)
      } catch (err) {

      }
    }

    change (newState) {
      this.state.change(this, newState)
    }
  }

  const elevator = new Elevator()
  elevator.change(Elevator.OPEN_STATE)
  // 假设2秒后启动了电梯
  new Promise(resolve => {
    setTimeout(() => {
      elevator.change(Elevator.WAITING_STATE)
      resolve()
    }, 2000)
  }).then(() => {
    elevator.change(Elevator.OPEN_STATE)
  })
  
  setTimeout(() => {
    elevator.change(Elevator.RUNING_STATE)
  }, 10000)
  
}

module.exports = {
  trafficLight,
  elevator
}