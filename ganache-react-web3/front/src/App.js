import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CounterArtifact from "./contracts/Counter.json"; // Truffle로 빌드한 계약 JSON

const Counter = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [count, setCount] = useState(0);

  // 여기에 스마트 계약 주소를 직접 입력
  const contractAddress = "0x0C48D953AF1e46253A4B8d30aB222b9778E347B5";

  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum) {
          // Web3 인스턴스 생성
          const web3 = new Web3(window.ethereum);

          // 사용자 계정 요청
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();

          // 계약 인스턴스 생성
          const instance = new web3.eth.Contract(
            CounterArtifact.abi,
            contractAddress // 직접 입력한 계약 주소 사용
          );

          setWeb3(web3);
          setAccount(accounts[0]);
          setContract(instance);

          // 초기 카운트 값 설정
          const currentCount = await instance.methods.current().call();
          setCount(currentCount);
        } else {
          console.log("MetaMask가 설치되어 있지 않습니다.");
        }
      } catch (error) {
        console.log("초기화 중 오류 발생:", error.message);
      }
    };

    init();
  }, []);

  const increment = async () => {
    try {
      if (contract && account) {
        console.log("카운트 증가 요청 중...");
        const receipt = await contract.methods
          .increment() // 여기를 decrement에서 increment로 수정
          .send({
            from: account,
            gas: 3000000,
            gasPrice: web3.utils.toWei("20", "gwei"),
          })
          .on("transactionHash", function (hash) {
            console.log("트랜잭션 해시:", hash);
          })
          .on("receipt", function (receipt) {
            console.log("트랜잭션이 성공적으로 완료되었습니다:", receipt);
          })
          .on("error", function (error) {
            console.error("트랜잭션 오류:", error);
          });
        console.log(receipt);

        const currentCount = await contract.methods.current().call();
        console.log(currentCount);
        setCount(currentCount);
      } else {
        console.log("계약 또는 계정이 로드되지 않았습니다.");
      }
    } catch (error) {
      console.error("카운트 증가 중 오류 발생:", error.message);
    }
  };

  const decrement = async () => {
    try {
      if (contract && account) {
        console.log("카운트 감소 요청 중...");
        await contract.methods.decrement().send({ from: account });
        const currentCount = await contract.methods.current().call();
        setCount(currentCount);
      } else {
        console.log("계약 또는 계정이 로드되지 않았습니다.");
      }
    } catch (error) {
      console.log("카운트 감소 중 오류 발생:", error.message);
    }
  };

  return (
    <div>
      <h1>현재 카운트: {count}</h1>
      <button onClick={increment}>카운트 증가</button>
      <button onClick={decrement}>카운트 감소</button>
    </div>
  );
};

export default Counter;
