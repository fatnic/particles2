function Vec2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vec2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
};

Vec2.prototype.reset = function() {
    this.x = 0;
    this.y = 0;
    return this;
};

Vec2.prototype.negative = function() {
    return this.set(-this.x, -this.y);
};

Vec2.prototype.add = function(v, copy) {
    self = (typeof copy === 'undefined') ? this : this.clone();
    if (v instanceof Vec2) return self.set(self.x + v.x, self.y + v.y);
    else return self.set(self.x + v, self.y + v);
};

Vec2.prototype.subtract = function(v, copy) {
    self = (typeof copy === 'undefined') ? this : this.clone();
    if (v instanceof Vec2) return self.set(self.x - v.x, self.y - v.y);
    else return self.set(self.x - v, self.y - v);
};

Vec2.prototype.multiply = function(v, copy) {
    self = (typeof copy === 'undefined') ? this : this.clone();
    if (v instanceof Vec2) return self.set(self.x * v.x, self.y * v.y);
    else return self.set(self.x * v, self.y * v);
};

Vec2.prototype.divide = function(v, copy) {
    self = (typeof copy === 'undefined') ? this : this.clone();
    if (v instanceof Vec2) return self.set(self.x / v.x, self.y / v.y);
    else return self.set(self.x / v, self.y / v);
};

Vec2.prototype.distance = function(v) {
    return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
};

Vec2.prototype.equals = function(v) {
    return this.x == v.x && this.y == v.y;
};

Vec2.prototype.dot = function(v) {
    return this.x * v.x + this.y * v.y;
};

Vec2.prototype.length = function() {
    return Math.sqrt(this.dot(this));
};

Vec2.prototype.unit = function() {
    return this.divide(this.length());
};

Vec2.prototype.toAngle = function() {
    return Math.asin(this.y / this.length());
};

Vec2.prototype.limit = function(v, copy) {
    self = (typeof copy === 'undefined') ? this : this.clone();
    if (v instanceof Vec2) {
        x = (Math.min(v.x, Math.max(-v.x, self.x)));
        y = (Math.min(v.y, Math.max(-v.x, self.y)));
    } else {
        x = (Math.min(v, Math.max(-v, self.x)));
        y = (Math.min(v, Math.max(-v, self.y)));
    }
    return self.set(x, y);
};

Vec2.prototype.vectorTo = function(v, copy) {
    return v.subtract(this, copy);
};

Vec2.prototype.normalize = function() {
    return this.unit();
};

Vec2.prototype.angleTo = function(a) {
    return Math.atan2(a.y - this.y, a.x - this.x);
};

Vec2.prototype.toArray = function(n) {
    return [this.x, this.y].slice(0, n || 2);
};

Vec2.prototype.clone = function() {
    return new Vec2(this.x, this.y);
};
