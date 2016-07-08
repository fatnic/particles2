function Segment(a, b) {
    this.a = a;
    this.b = b;

    Object.defineProperty(this, "length", {
        get: function() { return this.a.distanceTo(b); }
    });
}
