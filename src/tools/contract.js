// 导入模块
import detectEthereumProvider from '@metamask/detect-provider'; // 用于检测以太坊提供者（例如MetaMask）
import { ethers } from "ethers"; // 导入 ethers 库中的 ethers 和 BigNumber 对象
// import { Toast } from 'antd-mobile'
import { showToast } from 'vant';
import abi from "./abi.json"; // 导入智能合约 ABI

const usdtAbi = [
    "function balanceOf(address owner) view returns (uint256)",
];

/* 链接钱包类 */
export class ETH {
    static provider = undefined;    // 提供者
    static account = "";         // 钱包地址
    static signer = undefined;       // 用户签名者

    // 链接钱包返回钱包地址
    static async getAccount() {
        const ethereum = await detectEthereumProvider(); // 检测以太坊提供者
        if (!ethereum) { // 如果未检测到以太坊提供者
            //   Toast.show('请安装钱包'); // 显示失败的提示信息
            throw '请安装钱包'; // 抛出错误信息
        }
        ETH.provider = new ethers.providers.Web3Provider(ethereum); // 使用 Web3Provider 创建提供者
        const chainId = Number(await ethereum.request({ method: 'eth_chainId' })); // 获取链ID
        // showToast(chainId)
        if (chainId !== Number(import.meta.env.VITE_CHAINID) && chainId !== 1936529372) { // 如果链ID不匹配
            //   Toast.show('请连接BSC网络'); // 显示失败的提示信息
            throw '请连接BSC网络'; // 抛出错误信息
        }
        ETH.account = ethers.utils.getAddress((await ethereum.request({ method: 'eth_requestAccounts' }))[0]); // 获取钱包地址
        ETH.signer = ETH.provider.getSigner(); // 获取用户签名者
        return ETH.account; // 返回钱包地址
    }

    static async getISPSBalance() {
        const contract = new ethers.Contract(import.meta.env.VITE_ISPS, abi.ERC20, ETH.signer); // 创建合约对象
        const balance = await contract.balanceOf(ETH.account);
        return ethers.utils.formatUnits(balance, 'ether');
    }

    static async getISPAYBalance() {
        const contract = new ethers.Contract(import.meta.env.VITE_ISPAY, abi.ERC20, ETH.signer); // 创建合约对象

        try {
            // 调用balanceOf函数来获取USDT余额
            const balance = await contract.balanceOf(ETH.account);
            return ethers.utils.formatUnits(balance, 'ether');
        } catch (error) {
            console.error("获取ISPAY余额时出错:", error);
            return 0;
        }
    }
    static async getUSDTBalance() {
        const contract = new ethers.Contract(import.meta.env.VITE_USDT, abi.USDT, ETH.signer); // 创建合约对象

        try {
            // 调用balanceOf函数来获取USDT余额
            const balance = await contract.balanceOf(ETH.account);
            return ethers.utils.formatUnits(balance, 'ether');
        } catch (error) {
            console.error("获取USDT余额时出错:", error);
            return 0;
        }
    }

    static async getKSDTBalance() {
        const contract = new ethers.Contract(import.meta.env.VITE_KSDT, abi.ERC20, ETH.signer); // 创建合约对象
        const balance = await contract.balanceOf(ETH.account);
        return ethers.utils.formatUnits(balance, 'ether');
    }
    static async getUsdtValueFromIsps(amount) {
        try {
            const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT, abi.ISPS, ETH.signer); // 创建合约对象
            const path = [import.meta.env.VITE_ISPS, import.meta.env.VITE_USDT];
            const amountsOut = await contract.getAmountsOut(ethers.utils.parseEther(amount), path);
            return ethers.utils.formatUnits(amountsOut[1].toString(), 'ether');
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    // 签名
    static async signMessage() {
        // 使用用户签名者签名消息并返回签名结果
        return await ETH.signer.signMessage(ETH.account);
    }

    // 将数字转换为指定精度的 BigNumber 对象
    static parseUnits(n, dec) {
        return ethers.utils.parseUnits(`${n}`, dec); // 将数字转换为 BigNumber 对象
    }

    // 将 BigNumber 对象转换为指定精度的字符串
    static formatUnits(n, dec) {
        return ethers.utils.formatUnits(n, dec); // 将 BigNumber 对象转换为字符串
    }

    // 格式化钱包地址
    static format_address(v, n = 8) {
        const reg = new RegExp(`^(.{${n}})(.*)(.{${n}})$`, "ig"); // 创建正则表达式，用于格式化地址
        return v.replace(reg, "$1...$3"); // 格式化钱包地址
    }
}

/* 合约类 */
export class Contract {
    constructor(address, abiName) {
        this.address = address; // 设置合约地址
        this.abiName = abiName; // 设置 abi 名称
    }

    // 获取合约实例
    getInsance() {
        // if (!this.address || !ethers.utils.isAddress(this.address)) {
        //     throw new Error(`合约地址未配置或非法: ${this.address}`);
        // }

        // if (!ETH.signer) {
        //     throw new Error("用户钱包未连接，签名者不存在");
        // }

        // return new ethers.Contract(
        //     this.address,
        //     abi[this.abiName],
        //     ETH.provider
        // ).connect(ETH.signer);
        return new ethers.Contract(this.address, abi[this.abiName], ETH.provider).connect(ETH.signer); // 创建合约实例并连接用户签名者
    }

    // 调用合约方法
    async call(methods, params = []) {
        return await this.getInsance()[methods](...params); // 调用合约方法
    }

    // async send(method, params = []) {
    //     console.log("buy参数", method, params);

    //     const contract = this.getInsance(); // 会先做地址和 signer 校验

    //     if (!contract[method]) {
    //         throw new Error(`合约方法不存在: ${method}`);
    //     }

    //     // 检查 params 中是否有空地址
    //     params.forEach(p => {
    //         if (typeof p === "string" && p === "") {
    //             throw new Error("交易参数中包含空字符串");
    //         }
    //     });

    //     const tx = await contract[method](...params); // 发送交易
    //     console.log("tx.hash", tx.hash);

    //     const receipt = await tx.wait(); // 等待确认
    //     if (receipt.status !== 1) throw new Error("交易失败");

    //     return receipt;
    // }
    // 发送交易至合约
    async send(methods, params = []) {
        console.log('buy参数', methods, params)
        try {
            let tx = {};
            try {
                tx = await this.getInsance()[methods](...params); // 发送交易
            } catch (error) {
                if (!(error.code === "INVALID_ARGUMENT" && error.reason === "missing from address")) { // 如果不是因为缺少地址导致的错误
                    throw error; // 抛出错误
                }
                tx.hash = error.transactionHash; // 获取交易哈希
            }
            console.log('tx.hash', tx.hash)
            let receipt = await ETH.provider.waitForTransaction(tx.hash); // 等待交易确认
            if (receipt.status === 1) { // 如果交易成功
                // alert("交易成功");
                // console.log("交易成功");
            } else {
                throw '交易失败'; // 抛出错误信息
            }
        } catch (error) {
            let msg = "";
            console.log(error, error.data.message);
            if (error.data) msg = error.data.message;
            else if (/^Error/ig.test(error.toString())) msg = '交易失败';
            else if (error.message) msg = error.message;
            else msg = error;
            // Toast.show(msg); // 显示失败的提示信息
            throw '交易失败'; // 抛出错误信息
        }
    }
}