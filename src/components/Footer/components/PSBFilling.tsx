import banner from '@/static/PSB.jpg';
export default function PSBFilling({ code }: { code: string }) {
  return (
    <div style={{ display: 'inline-block' }}>
      <img style={{ display: 'inline-block', width: 16 }} src={banner} alt="川公网安备"></img>
      <span>川公网安备 {code}</span>
    </div>
  );
}
