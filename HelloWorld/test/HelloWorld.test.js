const helloworld = artifacts.require("HelloWorld");

contract("HelloWorld", (account) => {
  console.log(account);

  let hello;
  describe("hello contract", () => {
    it("contract", async () => {
      hello = await helloworld.deployed();
    });
    it("get value", async () => {
      console.log(await hello.value.call());
    });
    it("set value", async () => {
      await hello.setValue("셋 밸류 맘대로");
      console.log(await hello.value.call());
    });
  });
});
