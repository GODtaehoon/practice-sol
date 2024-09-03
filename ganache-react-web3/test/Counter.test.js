const Counter = artifacts.require("Counter");

contract("Counter", (accounts) => {
  it("should increment count", async () => {
    const counterInstance = await Counter.deployed();
    await counterInstance.increment();
    const count = await counterInstance.count();
    assert.equal(count.toNumber(), 1, "Count should be incremented to 1");
  });

  it("should decrement count", async () => {
    const counterInstance = await Counter.deployed();
    await counterInstance.decrement();
    const count = await counterInstance.count();
    assert.equal(count.toNumber(), 0, "Count should be decremented to 0");
  });
});
