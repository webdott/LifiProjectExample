import { useSignMessage } from 'wagmi';

const usePelerinSigner = () => {
  const { data: hash, isError, error, isLoading, isSuccess, signMessage } = useSignMessage();

  const toBase64 = (u8: number[]) => btoa(String.fromCharCode.apply(null, u8));

  const fromHexString = (hexString: string) =>
    Uint8Array.from(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));

  const fromBase64 = (str: string) =>
    atob(str)
      .split('')
      .map(function (c) {
        return c.charCodeAt(0);
      });

  const toHexString = (bytes: number[]) =>
    bytes.reduce((str: string, byte: number) => str + byte.toString(16).padStart(2, '0'), '');

  const base64Hash: string | undefined = hash
    ? toBase64(fromHexString(hash.replace('0x', '')) as unknown as number[])
    : undefined;

  const getSignature = () => {
    // generate random 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const message = 'MtPelerin-' + code;
    signMessage({ message });
  };

  return {
    getSignature,
    base64Hash,
    isErrorSigning: isError,
    isLoadingSigning: isLoading,
    isSuccessSigning: isSuccess,
    error,
  };
};

export default usePelerinSigner;
