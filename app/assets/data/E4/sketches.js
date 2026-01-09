import apartmentsSketchImg1 from '~/assets/images/apartments/E4/1.webp';
import apartmentsSketchImg2 from '~/assets/images/apartments/E4/2.webp';
import apartmentsSketchImg3 from '~/assets/images/apartments/E4/3.webp';
import apartmentsSketchImg4 from '~/assets/images/apartments/E4/4.webp';
import apartmentsSketchImg5 from '~/assets/images/apartments/E4/5.webp';
import apartmentsSketchImg6 from '~/assets/images/apartments/E4/6.webp';
import apartmentsSketchImg7 from '~/assets/images/apartments/E4/7.webp';
import { E4apartmentsPaths } from './paths';
import { E4apartments } from './apartments';

export const E4apartmentsSketches = [
	{
		phaseId: '1',
		blockId: 'E4',
		floorId: '1',
		img: apartmentsSketchImg1,
		paths: E4apartmentsPaths.find(p => p.floorId == '1'),
		apartments: E4apartments.filter(a => a.floorId == '1' && a.blockId == 'E4')
	},
	{
		phaseId: '1',
		blockId: 'E4',
		floorId: '2',
		img: apartmentsSketchImg2,
		paths: E4apartmentsPaths.find(p => p.floorId == '2'),
		apartments: E4apartments.filter(a => a.floorId == '2' && a.blockId == 'E4')
	},
	{
		phaseId: '1',
		blockId: 'E4',
		floorId: '3',
		img: apartmentsSketchImg3,
		paths: E4apartmentsPaths.find(p => p.floorId == '3'),
		apartments: E4apartments.filter(a => a.floorId == '3' && a.blockId == 'E4')
	},
	{
		phaseId: '1',
		blockId: 'E4',
		floorId: '4',
		img: apartmentsSketchImg4,
		paths: E4apartmentsPaths.find(p => p.floorId == '4'),
		apartments: E4apartments.filter(a => a.floorId == '4' && a.blockId == 'E4')
	},
	{
		phaseId: '1',
		blockId: 'E4',
		floorId: '5',
		img: apartmentsSketchImg5,
		paths: E4apartmentsPaths.find(p => p.floorId == '5'),
		apartments: E4apartments.filter(a => a.floorId == '5' && a.blockId == 'E4')
	},
	{
		phaseId: '1',
		blockId: 'E4',
		floorId: '6',
		img: apartmentsSketchImg6,
		paths: E4apartmentsPaths.find(p => p.floorId == '6'),
		apartments: E4apartments.filter(a => a.floorId == '6' && a.blockId == 'E4')
	},
	{
		phaseId: '1',
		blockId: 'E4',
		floorId: '7',
		img: apartmentsSketchImg7,
		paths: E4apartmentsPaths.find(p => p.floorId == '7'),
		apartments: E4apartments.filter(a => a.floorId == '7' && a.blockId == 'E4')
	}
];
