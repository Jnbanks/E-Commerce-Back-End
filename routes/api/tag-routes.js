const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll(
    {
      include: {
        model: Product,
      }
    }
  )
  .then(tagData => res.json(tagData))
  .catch(err =>{
    console.log(err)
    res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne(
    {
      where: 
      {
        id: req.params.id
      },
      include: [{
        model: Product,
      },
    ]
    })
  .then(productData => res.json(productData))
  .catch(err =>{
    console.log(err)
    res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Tag.create(
    {
      tag_name: req.body.tag_name
    })
  .then((tagName) => {
    res.json(tagName)
  })
  .catch((err) => {
    res.json(err)
  })
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where:{
        id: req.params.id,
      },
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag)
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((deletedTag) => {
    res.json(deletedTag)
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

module.exports = router;
