function normal () {
  class Shape {
    color
    line

    setColor (color) {
      this.color = color
    }

    setLine (line) {
      this.line = line
    }

    draw () {
      this.line.onPaint(this)
      this.color.onPaint(this)
    }

    getName () {

    }
  }

  class Rectangle extends Shape {
    getName () {
      return 'rectangle'
    }
  }

  class Color {
    // 桥接模式的关键，独立维度的对象里会用到抽象本身
    onPaint (shape) {}
  }

  class RedColor extends Color {
    onPaint (shape) {
      console.log(shape.getName() + ' be painted by red')
    }
  }

  class Line {
    onPaint(shape) {}
  }

  class SolidLine extends Line {
    onPaint (shape) {
      console.log(shape.getName() + ' be painted with solid line')
    }
  }

  const color = new RedColor()
  const line = new SolidLine()
  const rect = new Rectangle()
  rect.setColor(color)
  rect.setLine(line)
  rect.draw()
}

module.exports = {
  normal
}