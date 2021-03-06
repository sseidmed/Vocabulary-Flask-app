"""empty message

Revision ID: 5543414c3528
Revises: 127c3e6bdc26
Create Date: 2020-10-27 13:24:44.101266

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5543414c3528'
down_revision = '127c3e6bdc26'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('word', schema=None) as batch_op:
        batch_op.add_column(sa.Column('example1', sa.String(length=128), nullable=True))
        batch_op.add_column(sa.Column('example2', sa.String(length=128), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('word', schema=None) as batch_op:
        batch_op.drop_column('example2')
        batch_op.drop_column('example1')

    # ### end Alembic commands ###
