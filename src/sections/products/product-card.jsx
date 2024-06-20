import PropTypes from 'prop-types';
import { Box, Card, Link, Stack, Typography } from '@mui/material';

export default function ShopProductCard({ product }) {
  const renderStatus = (
    <Typography
      variant="subtitle2"
      color={(product.status === 'retired' && 'error') || 'info'}
      sx={{
        textTransform: 'uppercase',
        fontWeight: 'bold',
      }}
    >
      {product.status}
    </Typography>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.assetName}
      src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : ''}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
        visibility: product.imageUrls ? 'visible' : 'hidden',
      }}
    />
  );
  
  

  

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="h6">{product.assetName}</Typography>
        <Typography variant="subtitle1">Category: {product.categories}</Typography>
        <Typography variant="body2">Added by: {product.addedBy}</Typography>
        <Typography variant="body2">Date Time: {new Date(product.dateTime?.seconds * 1000).toLocaleString()}</Typography>
        {renderStatus}
        <Link href={product.imageUrls[0]} target="_blank" rel="noopener noreferrer">
          View Image
        </Link>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.shape({
    addedBy: PropTypes.string,
    assetId: PropTypes.string,
    assetName: PropTypes.string,
    categories: PropTypes.string,
    dateTime: PropTypes.object,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
  }),
};

