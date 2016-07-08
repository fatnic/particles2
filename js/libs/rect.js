function Rect(position, size) {
    this.position = position;
    this.size = size;

    Object.defineProperty(this, "x", {
        get: function() { return this.position.x; },
        set: function(x) { this.position.x = x; }
    });

    Object.defineProperty(this, "y", {
        get: function() { return this.position.y; },
        set: function(y) { this.position.y = y; }
    });

    Object.defineProperty(this, "width", {
        get: function() { return this.size.x; },
        set: function(width) { this.size.x = width; }
    });

    Object.defineProperty(this, "height", {
        get: function() { return this.size.y; },
        set: function(height) { this.size.y = height; }
    });

    Object.defineProperty(this, "points", {
        get: function() {
            return [
                new Vec2(this.position.x, this.position.y),
                new Vec2(this.position.x + this.size.x, this.position.y),
                new Vec2(this.position.x + this.size.x, this.position.y + this.size.y),
                new Vec2(this.position.x, this.position.y + this.size.y),
            ];
        }
    });

    Object.defineProperty(this, "center", {
        get: function() { return new Vec2(this.position.x + (this.size.x/2), this.position.y + (this.size.y/2)); },
    });

    Object.defineProperty(this, "segments", {
        get: function() {
            return [
                new Segment(new Vec2(this.position.x, this.position.y), new Vec2(this.position.x + this.size.x, this.position.y)),
                new Segment(new Vec2(this.position.x + this.size.x, this.position.y), new Vec2(this.position.x + this.size.x, this.position.y + this.size.y)),
                new Segment(new Vec2(this.position.x + this.size.x, this.position.y + this.size.y), new Vec2(this.position.x, this.position.y + this.size.y)),
                new Segment(new Vec2(this.position.x, this.position.y + this.size.y), new Vec2(this.position.x, this.position.y))
            ];
        }
    });

}

Rect.prototype.contains = function (point) {
    if (this.position.x <= point.x && point.x <= this.position.x + this.size.x &&
        this.position.y <= point.y && point.y <= this.position.y + this.size.y) {
            return true;
        }
    return false;
};

Rect.prototype.intersects = function (rect2) {

};

Rect.prototype.draw = function (context, filled) {
    var f =  (typeof filled === 'undefined') ? false : filled;
    if (f) {
        Draw.fillRect(context, this.position, this.size);
    } else {
        Draw.rect(context, this.position, this.size);
    }
};
