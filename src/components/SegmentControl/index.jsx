import Button from '../Button';
import { Tab, useTabs } from '../Tabs/Tabs';

function SegmentControl() {
  const { activeValue, setActiveValue } = useTabs();

  if (!activeValue.startsWith('videos')) {
    return null;
  }

  return (
    <div
      className="TUXSegmentedControl"
      data-compact="true"
      data-size="xs"
      data-shape="rectangle"
      style={{
        padding: '2px',
        marginTop: '2px',
        marginBottom: '8px',
      }}
    >
      <Tab value={'videos-latest'}>
        <Button segmentControl="Mới nhất" unstyledButton data-size="xs" />
      </Tab>
      <Tab value={'videos-popular'}>
        <Button segmentControl="Thịnh hành" unstyledButton data-size="xs" />
      </Tab>
      <Tab value={'videos-oldest'}>
        <Button segmentControl="Cũ nhất" unstyledButton data-size="xs" />
      </Tab>
    </div>
  );
}

export default SegmentControl;
